var SortTable = React.createClass({
  displayName: "SortTable",
  sortIt: function(colName) {
    if (colName) {
      var scope = this.props.store;
      scope.$apply(function() {
        scope.sortEntities(colName);
      });
    }
  },
  render() {
    var store = this.props.store;
    var tableItems = [];

    function isOdd(num) { return num % 2;}

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

    return (
      React.createElement("table", null, 
        React.createElement("caption", null, "Angulact Sortable Table"), 
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