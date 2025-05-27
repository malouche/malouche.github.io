---
cms_exclude: true
header:
  caption: ""
  image: ""
title: Research Publications Timeline
view: 4
---



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Research Publications Timeline (1997–2025)</title>
  <!-- Bootstrap CSS for responsiveness -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <!-- Vis.js timeline CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" />
  <style>
    body {
      padding: 20px;
    }
    #timeline {
      border: 1px solid #ddd;
      margin-top: 20px;
    }
    .filter-section {
      margin-bottom: 20px;
    }
    .publication-item {
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Research Publications Timeline (1997–2025)</h1>

    <!-- Search Bar -->
    <div class="form-group">
      <input type="text" id="searchBar" class="form-control" placeholder="Search publications by title or keyword">
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <label>Filter by Research Topics:</label>
      <div id="topicFilters" class="d-flex flex-wrap">
        <!-- Checkboxes will be generated here -->
      </div>
    </div>

    <!-- Timeline Container -->
    <div id="timeline"></div>

    <!-- Detailed View Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailModalLabel">Publication Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modalBody">
            <!-- Publication details will be injected here -->
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Dependencies -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>

  <script>
    // Sample publication data. Replace with your publication list.
    // Each publication object should include:
    // id, title, authors, abstract, venue, year, type (journal, conference, preprint),
    // quality (for journals), topics (array of strings), and links (object with keys like DOI, PDF)
    var publications = [
      {
        id: 1,
        title: "Sample Publication One",
        authors: "Author A, Author B",
        abstract: "This is a sample abstract for publication one.",
        venue: "Journal of Sample Studies",
        year: 2020,
        type: "journal",
        quality: "Q1",
        topics: ["COVID-19", "Data Science"],
        links: { DOI: "https://doi.org/10.1234/sample1", PDF: "https://example.com/sample1.pdf" }
      },
      {
        id: 2,
        title: "Sample Conference Paper",
        authors: "Author C, Author D",
        abstract: "This is a sample abstract for a conference paper.",
        venue: "International Conference on Sample Research",
        year: 2018,
        type: "conference",
        topics: ["Graphical Models"],
        links: { DOI: "https://doi.org/10.1234/sample2", PDF: "https://example.com/sample2.pdf" }
      }
      // Add more publications here...
    ];

    // Define colors for publication types.
    var typeColors = {
      journal: "#1f77b4",
      conference: "#2ca02c",
      preprint: "#ff7f0e"
    };

    // Generate a unique list of research topics.
    var allTopics = [];
    publications.forEach(function(pub) {
      pub.topics.forEach(function(topic) {
        if (allTopics.indexOf(topic) === -1) {
          allTopics.push(topic);
        }
      });
    });

    // Populate topic filters.
    var topicFiltersDiv = document.getElementById("topicFilters");
    allTopics.forEach(function(topic) {
      var container = document.createElement("div");
      container.className = "form-check mr-3";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input topic-checkbox";
      checkbox.value = topic;
      checkbox.id = "topic_" + topic;
      checkbox.checked = true;

      var label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = "topic_" + topic;
      label.innerText = topic;

      container.appendChild(checkbox);
      container.appendChild(label);
      topicFiltersDiv.appendChild(container);
    });

    // Create timeline items from publications.
    function createTimelineItems() {
      var items = [];
      publications.forEach(function(pub) {
        items.push({
          id: pub.id,
          content: pub.title,
          start: pub.year + "-01-01",
          title: pub.title,
          style: "background-color: " + typeColors[pub.type] + "; color: white; cursor: pointer;"
        });
      });
      return items;
    }

    var container = document.getElementById("timeline");
    var timelineItems = new vis.DataSet(createTimelineItems());
    var timelineOptions = {
      selectable: true,
      zoomable: true,
      horizontalScroll: true
    };
    var timeline = new vis.Timeline(container, timelineItems, timelineOptions);

    // When a timeline item is selected, show detailed view.
    timeline.on('select', function (properties) {
      if (properties.items.length > 0) {
        var selectedId = properties.items[0];
        var pub = publications.find(function(p) { return p.id === selectedId; });
        if (pub) {
          showPublicationDetails(pub);
        }
      }
    });

    // Display publication details in a modal.
    function showPublicationDetails(pub) {
      var modalBody = document.getElementById("modalBody");
      var html = "<h4>" + pub.title + "</h4>";
      html += "<p><strong>Authors:</strong> " + pub.authors + "</p>";
      html += "<p><strong>Venue:</strong> " + pub.venue + " (" + pub.year + ")</p>";
      if (pub.type === "journal" && pub.quality) {
        html += "<p><strong>Quality:</strong> " + pub.quality + "</p>";
      }
      html += "<p><strong>Abstract:</strong> " + pub.abstract + "</p>";
      html += "<p><strong>Links:</strong> ";
      for (var key in pub.links) {
        if (pub.links.hasOwnProperty(key)) {
          html += "<a href='" + pub.links[key] + "' target='_blank'>" + key + "</a> ";
        }
      }
      html += "</p>";
      modalBody.innerHTML = html;
      $('#detailModal').modal('show');
    }

    // Update timeline based on active topic filters and search query.
    function updateTimeline() {
      var activeTopics = Array.from(document.querySelectorAll(".topic-checkbox:checked")).map(function(checkbox) {
        return checkbox.value;
      });

      var query = document.getElementById("searchBar").value.toLowerCase();

      var filteredPubs = publications.filter(function(pub) {
        var topicMatch = pub.topics.some(function(topic) {
          return activeTopics.indexOf(topic) !== -1;
        });
        var searchMatch = (pub.title.toLowerCase().indexOf(query) !== -1) ||
                          (pub.abstract.toLowerCase().indexOf(query) !== -1);
        return topicMatch && searchMatch;
      });

      var newItems = [];
      filteredPubs.forEach(function(pub) {
        newItems.push({
          id: pub.id,
          content: pub.title,
          start: pub.year + "-01-01",
          title: pub.title,
          style: "background-color: " + typeColors[pub.type] + "; color: white; cursor: pointer;"
        });
      });

      timelineItems.clear();
      timelineItems.add(newItems);
    }

    // Add event listeners for search and topic filters.
    document.getElementById("searchBar").addEventListener("input", updateTimeline);
    document.querySelectorAll(".topic-checkbox").forEach(function(checkbox) {
      checkbox.addEventListener("change", updateTimeline);
    });
  </script>
</body>
</html>
