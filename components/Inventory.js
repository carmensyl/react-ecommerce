import React from 'react'
import AddInventory from '../components/formComponents/AddInventory'
import ViewInventory from '../components/ViewInventory'

class Inventory extends React.Component {
  state = {
    viewState: 'view'
  }
  toggleViewState(viewState) {
    this.setState(() => ({ viewState }))
  }
  render() {
    return (
      <div>
          {/* <div className="flex my-6">
                   
          </div> */}
          {
            this.state.viewState === 'view' ? (
              <p role="button" id="add-item-btn" className="cursor-pointer hover:text-blue-600" onClick={() => this.toggleViewState('add')}>Add Item</p>
            ) : (<p role="button" id="view-inventory-btn" className="mr-4 cursor-pointer hover:text-blue-600" onClick={() => this.toggleViewState('view')}>View Inventory</p>)
          }
          {
            this.state.viewState === 'view' ? (
              <ViewInventory />
            ) : (<AddInventory />)
          }
          <button onClick={this.props.signOut} className="mt-4 bg-blue-600 text-white hover:bg-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign Out
          </button> 
      </div> 
    )
  }
}

export default Inventory;