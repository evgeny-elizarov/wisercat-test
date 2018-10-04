import React from 'react';
import {FieldConnect, ErrorField} from 'react-components-form';

class DateSelectField extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dayOptions: [],
            monthOptions: [],
            yearOptions: [],
            day: '',
            month: '',
            year: ''
        };
    }

    componentDidMount(){
        this.rebuildOptions();
    }

    componentDidUpdate(prevProps){
        if(
            this.props.value !== prevProps.value
        ){
            this.rebuildOptions();
        }
    }

    getCurrentDate = () => {
        return (this.props.value instanceof Date)? this.props.value : new Date();
    };

    daysInMonth = (month, year) => {
        return new Date(year, month+1, 0).getDate();
    };

    getDayOptions = (date) => {
        let dayOptions = [];
        for(let day = 1; day <= this.daysInMonth(date.getMonth(), date.getFullYear()); day++){
            dayOptions.push({
                label: day,
                value: day
            });
        }
        return dayOptions;
    };

    getMonthOptions = () => {
        let monthOptions = [];
        for(let m = 1; m <= 12; m++){
            monthOptions.push({
                label: m,
                value: m-1
            });
        }
        return monthOptions;
    };

    getYearOptions = (date) => {
        const year = parseInt(date.getFullYear());
        let yearOptions = [];
        for(let offset = -5; offset <= 5; offset ++){
            yearOptions.push({
                label: year + offset,
                value: year + offset
            });
        }
        return yearOptions;
    };

    rebuildOptions = () => {
        const date = this.getCurrentDate();
        this.setState({
            dayOptions: this.getDayOptions(date),
            monthOptions: this.getMonthOptions(),
            yearOptions: this.getYearOptions(date),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        });
    };

    handleDayChange = (e) => {
        const value = e.target.value;
        const newDate = new Date(this.state.year, this.state.month, value);
        this.props.onChange(newDate);
        this.rebuildOptions();
    };

    handleMonthChange = (e) => {
        const value = e.target.value;
        const newDate = new Date(this.state.year, value, this.state.day);
        this.props.onChange(newDate);
        this.rebuildOptions();
    };

    handleYearChange = (e) => {
        const value = e.target.value;
        const newDate = new Date(value, this.state.month, this.state.day);
        this.props.onChange(newDate);
        this.rebuildOptions();
    };

    render() {
        const {name, options, value, unit, onChange, error, errors, errorsStyles} = this.props;

        return (
            <div className="date-select">
                <select onChange={this.handleDayChange} value={this.state.day}>
                    {this.state.dayOptions.map((day, i) => (
                        <option key={i} value={day.value}>{day.label}</option>
                    ))}
                </select>
                <select onChange={this.handleMonthChange} value={this.state.month}>
                    {this.state.monthOptions.map((month, i) => (
                        <option key={i} value={month.value}>{month.label}</option>
                    ))}
                </select>
                <select onChange={this.handleYearChange} value={this.state.year}>
                    {this.state.yearOptions.map((year, i) => (
                        <option key={i} value={year.value}>{year.label}</option>
                    ))}
                </select>
                {error && <ErrorField errors={errors} {...errorStyles} />}
            </div>
        );
    }
}

export default FieldConnect(DateSelectField);