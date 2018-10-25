$(document).ready(function() {
	    taskList();
	});
	/* $.ajax({
        url: "http://localhost:8080/todolist/Tasks/Task"
    }).then(function(data) {
	    console.log(data);
		// Iterate over the collection of data
		var tasks = data;
		$.each(tasks, function (index, task) {
			// Add a row to the task table
			//console.log(tasks);
			//console.log(task);
			taskAddRow(task);
		});
    
	}); */

	var Task = {
	    id: 0,
	    name: "",
	    description: "",
	}

	function taskList() {
	    // Call Rest API to get a list of users
	    $.ajax({
	        url: 'http://localhost:8080/todolist/Tasks/Task/',
	        type: 'GET',
	        dataType: 'json',
	        success: function(tasks) {
	            taskListSuccess(tasks);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function taskListSuccess(tasks) {
	    $.each(tasks, function(index, task) {
	        // Add a row to the task table
	        taskAddRow(task);
	    });
	}

	function taskAddRow(task) {
	    console.log('inside taskAddRow');
	    console.log(task); // console.log is used for debugging purposes
	    // Check if <tbody> tag exists, add one if not
	    if ($("#taskTable tbody").length == 0) {
	        $("#taskTable").append("<tbody></tbody>");
	    }
	    // Append row to <table>
	    $("#taskTable tbody").append(taskBuildTableRow(task));
	}

	function taskBuildTableRow(task) {
	    console.log(task);
	    var ret =
	        "<tr>" +
	        "<td>" +
	        "<button type='button' " +
	        "onclick='taskGet(this);' " +
	        "class='btn btn-default' " +
	        "data-id='" + task.id + "'>" +
	        "<span class='glyphicon glyphicon-edit' />" +
	        "</button>" +
	        "</td >" +
	        "<td>" + task.id + "</td>" +
	        "<td>" + task.name + "</td>" +
	        "<td>" + task.description + "</td>" +
	        "<td>" +
	        "<button type='button' " +
	        "onclick='taskDelete(this);' " +
	        "class='btn btn-default' " +
	        "data-id='" + task.id + "'>" +
	        "<span class='glyphicon glyphicon-remove' />" +
	        "</button>" +
	        "</td>" +
			"<td>" +
			"<input type='checkbox'" +
			"class='btn btn-default'" +
			"data-id='" + task.id + "'>" +
			"</button>" +
			"</td>" +
	        "</tr>";
	    return ret;
	}
	

	function handleException(request, message, error) {
	    var msg = "";
	    msg += "Code: " + request.status + "\n";
	    msg += "Text: " + request.statusText + "\n";
	    if (request.responseJSON != null) {
	        msg += "Message" + request.responseJSON.Message + "\n";
	    }
	    alert(msg);
	}

	// Handle click event on Update button
	function taskUpdate(task) {
	    $.ajax({
	        url: "http://localhost:8080/todolist/Tasks/Task/" + task.id,
	        type: 'PUT',
	        contentType: "application/json;charset=utf-8",
	        data: JSON.stringify(task), //exchange data to/from web server
	        success: function(task) {
	            taskUpdateSuccess(task);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function taskUpdateSuccess(task) {
	    taskUpdateInTable(task);
	    //$("#taskTable tbody").remove();
	    //formClear();
	    //taskList();
	}

	function taskUpdateInTable(task) {

	    Task = new Object();
	    Task.id = $("#taskid").val();
	    Task.name = $("#taskname").val();
	    Task.description = $("#description").val();

	    // Find task in <table>
	    var row = $("#taskTable button[data-id='" + Task.id + "']").parents("tr")[0];
	    // Add changed task to table
	    $(row).after(taskBuildTableRow(Task));
	    // Remove original task
	    $(row).remove();
	    formClear(); // Clear form fields
	    // Change Update Button Text
	    $("#updateButton").text("Add");
	}

	// Handle click event on Add button
	function taskAdd(task) {
	    $.ajax({
	        url: "http://localhost:8080/todolist/Tasks/Task/",
	        type: 'POST',
	        contentType: "application/json;charset=utf-8",
	        data: JSON.stringify(task),
	        success: function(task) {
	            taskAddSuccess(task);
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function taskAddSuccess(task) {
	    $("#taskTable tbody").remove();
	    formClear();
	    taskList();
	}

	function formClear() {
	    $("#taskid").val("");
	    $("#taskname").val("");
	    $("#description").val("");
	}

	function addClick() {
	    formClear();
	}

	function updateClick() {
	    // Build Task object from inputs
	    Task = new Object();
	    Task.name = $("#taskname").val();
	    Task.description = $("#description").val();
	    if ($("#updateButton").text().trim() == "Add") {
	        //console.log(Task)
	        taskAdd(Task);
	    } else {
	        Task.id = $("#taskid").val();
	        taskUpdate(Task);
	    }
	}

	function taskToFields(task) {
	    $("#taskid").val(task.id);
	    $("#taskname").val(task.name);
	    $("#description").val(task.description);
	}

	function taskGet(ctl) {
	    // Get task id from data- attribute
	    var id = $(ctl).data("id");

	    // Store task id in hidden field
	    $("#taskid").val(id);

	    // Call REST API to get a list of Task
	    $.ajax({
	        url: "http://localhost:8080/todolist/Tasks/Task/" + id,
	        type: 'GET',
	        dataType: 'json',
	        success: function(task) {
	            taskToFields(task);

	            // Change Update Button Text
	            $("#updateButton").text("Update");
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
	}

	function taskDelete(ctl) {
	    var id = $(ctl).data("id");

	    $.ajax({
	        url: "http://localhost:8080/todolist/Tasks/Task/" + id,
	        type: 'DELETE',
	        success: function(task) {
	            $(ctl).parents("tr").remove();
	        },
	        error: function(request, message, error) {
	            handleException(request, message, error);
	        }
	    });
		
		
	}

