# Use an official Java runtime as the base image
FROM eclipse-temurin:19

# Set the working directory within the container
WORKDIR /app
RUN ./mvnw spring-boot:build-image
# Copy the jar file and run it
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]