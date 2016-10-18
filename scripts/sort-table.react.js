var SortTable = React.createClass({
  displayName: "SortTable",
  /*
  * Method called from the component click event
  * */
  sortIt: function(colName) {
    //  pass the column name
    if (colName) {
      // get a reference to angular 'scope'
      var scope = this.props.store;
      // use scope.$apply to trigger a digest cycle
      scope.$apply(function() {
        // call the sortEntities method in the angular controller to update 'store'
        scope.sortEntities(colName);
      });
    }
  },
  render() {
    var store = this.props.store;
    var tableItems = [];

    function isOdd(num) { return num % 2;}

    /*
    * Build the table rows
    * */
    if (store.collection && store.collection.map) {

      store.collection.map(function(rowItem, index) {
        var gridRowClass = 'Grid__Row';
        if (isOdd(index)) {
          gridRowClass = 'Grid__Row Grid__Row--zebra';
        }

        var rowElement = (
          React.createElement("tr", {key: rowItem.firstName, className: gridRowClass}, 
            React.createElement("td", null, 
              React.createElement("div", {className: "Grid__Cell"}, rowItem.firstName)
            ), 
            React.createElement("td", null, 
              React.createElement("div", {className: "Grid__Cell"}, rowItem.lastName)
            ), 
            React.createElement("td", null, 
              React.createElement("div", {className: "Grid__Cell"}, rowItem.age)
            )
          )
        );
        tableItems.push(rowElement);
      });
    }

    /*
    * Main table component wrapper code
    * note the binding to sortIt method in the onClick event attributes
    *  use .bind to pass the value of the column name to sort
    * */
    return (
      React.createElement("table", null, 
        React.createElement("thead", {className: "GridHeader"}, 
          React.createElement("tr", null, 
            React.createElement("th", null, 
              React.createElement("button", {onClick: this.sortIt.bind(this, 'fistName'), className: "LinkButton"}, "First Name")
            ), 
            React.createElement("th", null, 
              React.createElement("button", {onClick: this.sortIt.bind(this, 'lastName'), className: "LinkButton"}, "Last Name")
            ), 
            React.createElement("th", null, 
              React.createElement("button", {onClick: this.sortIt.bind(this, 'age'), className: "LinkButton"}, "Age")
            )
          )
        ), 
        React.createElement("tbody", null, 
          tableItems
        )
      )
    );
  }
});
