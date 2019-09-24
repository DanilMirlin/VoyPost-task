import React from 'react'
import axios from "axios";
import moment from 'moment'

class Search extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            tripsData: {},
            value: ""
        }

    }

    handleDepart = event => {
        const str = this.refD.value;
        const dData = this.state.tripsData.filter(function (item) {
            return item.fromName.includes(str);
        });
        console.log('this.ref.value: ', this.refD.value, dData, dData.length)
        if (dData.length === 0) {
            document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, no departure found :c </td></tr>'

        } else {
            this.setTripData(dData)
        }
    };

    handleArrive = event => {
        const str = this.refA.value;
        const dData = this.state.tripsData.filter(function (item) {
            return item.toName.includes(str);
        });
        console.log('this.ref.value: ', this.refA.value, dData, dData.length)
        if (dData.length === 0) {
            document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, no arrivals found :c </td></tr>'

        } else {
            this.setTripData(dData)
        }
    };


    getTripData = async () => {
        axios.get('datas/trips.json')
            .then(response => {
                console.log('Data: ', response.data);
                // this.setState(response.data);
                this.state.tripsData = response.data;
                this.setTripData();
            })
    };

    setTripData = async (fData = false) => {
        fData = fData ? fData : this.state.tripsData;
        document.getElementById('tripsTableData').innerHTML = fData.map((item) => {
            return '<tr>' +
                '<td>' + item.fromName + '</td>' +
                '<td>' + item.toName + '</td>' +
                '<td>' + moment(item.departAt).format('DD/MM/YYYY HH:mm') + '</td>' +
                '<td>' + item.vehicle + '</td>' +
                '</tr>';
        }).join(' ')

    }


    render() {


        this.getTripData();


        return (
            <div>
                <h1>Travel board</h1>
                <form>
                    <div className="searchItem">
                        Derture search:
                        <br/>
                        <input
                            onKeyUp={this.handleDepart}
                            ref={ref => (this.refD = ref)}
                        />
                    </div>
                    <div className="searchItem">
                        Arrival search:
                        <br/>
                        <input
                            onKeyUp={this.handleArrive}
                            ref={ref => (this.refA = ref)}
                        />
                    </div>
                </form>

                <table id="tripsTable">
                    <thead>
                    <tr>
                        <th>Departure City</th>
                        <th>Arrival City</th>
                        <th>Departure Date, Time</th>
                        <th>Vehicle</th>
                    </tr>
                    </thead>
                    <tbody id="tripsTableData"></tbody>
                </table>
            </div>

        );
    }

}

export default Search;