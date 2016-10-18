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
          <tr key={rowItem.firstName} className={gridRowClass}>
            <td>
              <div className="Grid__Cell">{rowItem.firstName}</div>
            </td>
            <td>
              <div className="Grid__Cell">{rowItem.lastName}</div>
            </td>
            <td>
              <div className="Grid__Cell">{rowItem.age}</div>
            </td>
          </tr>
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
      <table>
        <thead className="GridHeader">
          <tr>
            <th>
              <button onClick={this.sortIt.bind(this, 'fistName')}  className="LinkButton">First Name</button>
            </th>
            <th>
              <button onClick={this.sortIt.bind(this, 'lastName')}  className="LinkButton">Last Name</button>
            </th>
            <th>
              <button onClick={this.sortIt.bind(this, 'age')}  className="LinkButton">Age</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableItems}
        </tbody>
      </table>
    );
  }
});
