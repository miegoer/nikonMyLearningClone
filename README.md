# Nikon MyLearning Clone

A cloned version of the Nikon MyLearning platforms landing page using Bootstrap, Javascript and some custom CSS as needed.
<br />
Testing completed with Jest frameworks.

## Getting Started

### Installation

* Install NPM packages
   ```sh
   npm install
   ```
* Open index.html to view page
* Run testing using
  ```sh
  npx jest
  ```

## Ancknowledgements

* [Initial HTML boilerplate generated using HTMLBoilerplates](https://htmlboilerplates.com/)
* [Jest config created using documentation](https://jestjs.io/docs/configuration)

## Creation Process

1. Used [Excalidraw](https://excalidraw.com/) to help visualize concept image as elements
![screenshot of Excalidraw template](./README_assets/myLearningExcalidraw.PNG)
2. Create base project, with separate HTML, JS and CSS files. Custom CSS will still be necessary, even with Bootstrap as some pre-built elements need to be changed to closer match the concept.
3. Using TDD implement the navbar. Key points of this process were:
* Increased logo and font size for better accessibility.
* Javascript implementation of changing nav bar links on hover.
4. Using TDD implement login section. Key points of this process were:
* Using Bootstrap's grid utilities to evenly space the sections.
* Using inbuilt Bootstrap elements to create the form and applying custom CSS to match the concept image.
* Javascript implementation of changing log in button style on hover.
* Javascript implementation of a warning feature if both form inputs aren't filled in, using Bootstrap warnings.