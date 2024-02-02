$(document).ready(function () {
  // Display existing studies
  displayStudies();

  // Handle form submission to add a new study
  $("#addStudyForm").submit(function (event) {
    event.preventDefault();

    // Get values from the form
    var title = $("#title").val();
    var studyStatus = $("#studyStatus").val();
    var description = $("#description").val();

    // Make a POST request to add a new study
    $.ajax({
      url: "http://localhost:8080/api/entities",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        title: title,
        studyStatus: studyStatus,
        description: description,
      }),
      success: function () {
        // Clear the form
        $("#addStudyForm")[0].reset();

        // Refresh the displayed studies
        displayStudies();
      },
    });
  });

  // Handle filter button click
  $("#filterButton").click(function () {
    // Refresh the displayed studies with the applied filter
    displayStudies();
  });

  // Function to display studies
  function displayStudies() {
    // Get the filter values
    var filterTitle = $("#filterTitle").val().toLowerCase();
    var filterStudyStatus = $("#filterStudyStatus").val().toLowerCase();
    var filterDescription = $("#filterDescription").val().toLowerCase();

    // Make a GET request to your Spring Boot API endpoint
    $.get("http://localhost:8080/api/entities", function (data) {
      // Clear the existing list
      $("#entityList").empty();

      // Iterate through the entities and append them to the list
      data.forEach(function (entity) {
        // Apply filter by title, studyStatus, and description
        if (
          (entity.title.toLowerCase().includes(filterTitle) ||
            filterTitle === "") &&
          (entity.studyStatus.toLowerCase().includes(filterStudyStatus) ||
            filterStudyStatus === "") &&
          (entity.description.toLowerCase().includes(filterDescription) ||
            filterDescription === "")
        ) {
          // Display title, studyStatus, and description
          var listItem = $(
            "<li class='entity-item' data-entity-id='" +
              entity.id +
              "'>" +
              "<strong>Title:</strong> " +
              entity.title +
              "<br>" +
              "<strong>Study Status:</strong> " +
              entity.studyStatus +
              "<br>" +
              "<strong>Description:</strong> " +
              entity.description +
              "</li>"
          );

          // Add update button with click event
          var updateButton = $("<button class='update-button'>Update</button>");
          updateButton.click(function () {
            showUpdateInputs(entity);
          });

          // Add delete button with click event
          var deleteButton = $("<button class='delete-button'>Delete</button>");
          deleteButton.click(function () {
            deleteStudy(entity.id);
          });

          listItem.append(updateButton);
          listItem.append(deleteButton);
          $("#entityList").append(listItem);

          // Add hidden input bars for update
          var updateInputs = $(
            "<div class='update-inputs' style='display:none;'>" +
              "<input type='text' id='updateTitle' placeholder='New Title'>" +
              "<input type='text' id='updateStudyStatus' placeholder='New Study Status'>" +
              "<textarea id='updateDescription' placeholder='New Description'></textarea>" +
              "<button class='update-confirm-button'>Update</button>" +
              "</div>"
          );

          // Add click event to update confirm button
          updateInputs.find(".update-confirm-button").click(function () {
            updateStudy(entity.id);
          });

          listItem.append(updateInputs);
        }
      });
    });
  }

  // Function to delete a study
  function deleteStudy(id) {
    // Make a DELETE request to your Spring Boot API endpoint
    $.ajax({
      url: "http://localhost:8080/api/entities/" + id,
      type: "DELETE",
      success: function () {
        // Refresh the displayed studies after deletion
        displayStudies();
      },
    });
  }

  // Function to show input bars for update
  function showUpdateInputs(entity) {
    // Hide input bars for all other entities
    $(".update-inputs").hide();

    // Show input bars for the selected entity
    $("#entityList")
      .find(".entity-item")
      .each(function () {
        var entityId = $(this).data("entity-id");
        if (entityId === entity.id) {
          $(this).find(".update-inputs").show();
        }
      });
  }

  // Function to update a study
  function updateStudy(id) {
    // Get values from the input bars
    var newTitle = $("#updateTitle").val();
    var newStudyStatus = $("#updateStudyStatus").val();
    var newDescription = $("#updateDescription").val();

    // Make a PUT request to update the study
    $.ajax({
      url: "http://localhost:8080/api/entities/" + id,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        title: newTitle,
        studyStatus: newStudyStatus,
        description: newDescription,
      }),
      success: function () {
        // Hide input bars after update
        $(".update-inputs").hide();

        // Refresh the displayed studies after update
        displayStudies();
      },
    });
  }

  // Event delegation for dynamically added buttons
  $("#entityList").on("click", ".update-button", function () {
    // Find the corresponding entity ID
    var entityId = $(this).closest(".entity-item").data("entity-id");

    // Get the entity details from the data attribute
    var entity = {
      id: entityId,
      title: $(this)
        .siblings('strong:contains("Title")')
        .text()
        .replace("Title:", "")
        .trim(),
      studyStatus: $(this)
        .siblings('strong:contains("Study Status")')
        .text()
        .replace("Study Status:", "")
        .trim(),
      description: $(this)
        .siblings('strong:contains("Description")')
        .text()
        .replace("Description:", "")
        .trim(),
    };

    // Show the update inputs for the selected entity
    showUpdateInputs(entity);
  });

  // Event delegation for dynamically added update confirm buttons
  $("#entityList").on("click", ".update-confirm-button", function () {
    // Find the corresponding entity ID
    var entityId = $(this).closest(".entity-item").data("entity-id");

    // Update the study with the corresponding ID
    updateStudy(entityId);
  });
});
