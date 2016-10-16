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
    if (store.collection) {

      store.collection.map(function(rowItem) {
        var rowElement = (
          <tr key={rowItem.firstName}>
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

    return (
      <table>
        <thead>
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