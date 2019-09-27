import React from 'react'
import axios from "axios"
import moment from 'moment'
import { connect } from 'react-redux'
import {setTrips} from '../redux'

class Search extends React.Component {

    /**
     * Filtering Redux store data depending on user's input in 'Departure search'
     * and showing resulting table
     */
    handleDepart = event => {
        const str = this.refD.value;
        const dData = this.props.trips.tripsData.filter(function (item) {
            return item.fromName.toUpperCase().includes(str.toUpperCase());
        });
        if (dData.length === 0) {
            document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, no departure found :c </td></tr>'
        } else {
            this.showTripData(dData)
        }
    };

    /**
     * Filtering Redux store data depending on user's input in 'Arrival search'
     * and showing resulting table
     */
    handleArrive = event => {
        const str = this.refA.value;
        const dData = this.props.trips.tripsData.filter(function (item) {
            return item.toName.toUpperCase().includes(str.toUpperCase());
        });
        console.log('this.ref.value: ', this.refA.value, dData, dData.length)
        if (dData.length === 0) {
            document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, no arrivals found :c </td></tr>'

        } else {
            this.showTripData(dData)
        }
    };

    /**
     * Fetching initial trips data from server using API
     * and passing it to Redux store
     */
    getTripData =  () => {
        axios.get('http://127.0.0.1:3001/api/trips')
            .then(response => {
                this.props.setTrips({ tripsData: response.data });
                this.showTripData();
            })
            .catch(error=>{
                document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, something wrong on a serverside </td></tr>'
            })
    };

    /**
     * Showing table with trips data
     * by default Redux store data is used,
     * but we can re-use this function with filtered data
     * (by handleDepart or handleArrive functions)
     */
    showTripData = async (fData = false) => {
        fData = fData ? fData : this.props.trips.tripsData;
        document.getElementById('tripsTableData').innerHTML = fData.map((item) => {
            return '<tr>' +
                '<td>' + item.fromName + '</td>' +
                '<td>' + item.toName + '</td>' +
                '<td>' + moment(item.departAt).format('DD/MM/YYYY HH:mm') + '</td>' +
                '<td>' + item.vehicle + '</td>' +
                '</tr>';
        }).join(' ')

    }

    componentDidMount() {
        this.getTripData();
    }

    render() {
        return (
            <div>
                <h1>Travel board</h1>
                <form>
                    <div className="searchItem">
                        Departure search:
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


// Redux container
const mapStateToProps = state => ({
    trips: state.trips,
});

const mapDispatchToProps = {
    setTrips
};

const AppContainer  = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default AppContainer ;
