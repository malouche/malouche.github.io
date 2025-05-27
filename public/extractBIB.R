# Install required packages if not already installed
# install.packages(c("bibtex", "jsonlite", "stringr"))

library(bibtex)
library(jsonlite)
library(stringr)

# Read the BibTeX file (adjust the file path if needed)
bib_entries <- read.bib("/Users/dhafermalouche/Documents/GitHub/malouche.github.io/static/uploads/own-bib.bib")

# Initialize an empty list for publications
publications <- list()
id <- 1

# Process each BibTeX entry
for (entry in bib_entries) {
  pub <- list()
  pub$id <- id
  id <- id + 1
  
  pub$title <- if (!is.null(entry$title)) entry$title else ""
  pub$authors <- if (!is.null(entry$author)) paste(entry$author, collapse = ", ") else ""
  pub$abstract <- if (!is.null(entry$abstract)) entry$abstract else ""
  
  # Check if bibtype exists and is non-empty
  entryType <- if (!is.null(entry$bibtype) && length(entry$bibtype) > 0) entry$bibtype else ""
  
  if (entryType == "Article") {
    pub$venue <- if (!is.null(entry$journal)) entry$journal else ""
    pub$type <- "journal"
  } else if (entryType == "InProceedings") {
    pub$venue <- if (!is.null(entry$booktitle)) entry$booktitle else ""
    pub$type <- "conference"
  } else {
    pub$venue <- ""
    pub$type <- "preprint"  # Default for missing or other types.
  }
  
  pub$year <- if (!is.null(entry$year)) as.integer(entry$year) else NA
  pub$quality <- if (!is.null(entry$quality)) entry$quality else ""
  
  # Process keywords as topics
  if (!is.null(entry$keywords)) {
    topics <- unlist(strsplit(entry$keywords, ","))
    pub$topics <- trimws(topics)
  } else {
    pub$topics <- list()
  }
  
  # Set up links using DOI and URL if available
  links <- list()
  if (!is.null(entry$doi)) {
    links$DOI <- paste0("https://doi.org/", entry$doi)
  }
  if (!is.null(entry$url)) {
    links$PDF <- entry$url
  }
  pub$links <- links
  
  publications[[length(publications) + 1]] <- pub
}


# Convert the publications list to JSON format
json_output <- toJSON(publications, auto_unbox = TRUE, pretty = TRUE)

# Output the JSON to the console (or write to a file using write() or writeLines())
sink("/Users/dhafermalouche/Documents/GitHub/malouche.github.io/static/uploads/own-bib.json")
cat(json_output)
sink()
