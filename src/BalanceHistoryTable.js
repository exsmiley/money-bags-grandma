import React from 'react';

class BalanceHistoryTable extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            history: props.history,
            keys: props.keys
        }

        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
    }

    renderHeader() {
        let header = this.state.keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
        return (
            <thead>
                <tr>{header}</tr>
            </thead>
        )
    }

    renderBody() {
        return (
            <tbody>
                {this.getRowsData()}
            </tbody>
        )
    }
    
    getKeys() {
        return this.props.keys;
    }
    
    getHeader() {
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
        })
    }
    
    getRowsData() {
        var items = this.state.history;
        var keys = this.props.keys;
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} history={row} keys={keys}/></tr>
        })
    }
    
    render() {
        return (
            <div>
                <table>
                    {this.renderHeader()}
                    {this.renderBody()}
                </table>
            </div>
        );
    }
   }
   const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
            return <td key={props.history[key] + index + key}>{props.history[key]}</td>
        })
   }

export default BalanceHistoryTable;
