FROM maven:3.5-jdk-8-alpine
WORKDIR /ToDoList
COPY . /ToDoList/
EXPOSE 8080
RUN ["mvn", "clean", "install"]
CMD ["java", "-jar", "target/ToDoList-0.0.1-SNAPSHOT.jar"]
