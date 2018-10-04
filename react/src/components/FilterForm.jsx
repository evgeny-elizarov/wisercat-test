import "./FilterForm.scss";
import React from 'react';
import {
    Form,
    ListField,
    ObjectField,
    TextField,
    SelectField,
    SubmitField,
    FormEventsEmitter
} from 'react-components-form';
import Schema from 'form-schema-validation';
import RadioGroupField from "./RadioGroupField";
import DateSelectField from "./DateSelectField";
import filtersApi from "../api/filtersApi";


const filterOptions1 = [
    {label: "Titel", value: "opt1"},
    {label: "Titel 2", value: "opt2"},
    {label: "Titel 3", value: "opt3"},
];

const filterOptions2 = [
    {label: "beginnt mit", value: "opt1"},
    {label: "beginnt mit 2", value: "opt2"},
    {label: "beginnt mit 3", value: "opt3"},
];

const radioFilterOptions = [
    {label: "alle Bedingunen", value: "pickDate"},
    {label: "mindestens eine Bedingung", value: "otherOpt1"},
    {label: "keine der Bedingungen erfüllen", value: "otherOpt2"},
];

const initialFilter = {
    filter: "Initial data",
    filterList: [
            {
                filter1: "",
                filter2: "",
                filter3: "",
                filter3Date: "",
            }
        ],
    radioFilter: ""
};
const listFilter = new Schema({
    filter1: {
        type: String,
    },
    filter2: {
        type: String,
    },
    filter3: {
        type: String,
    },
    filter3Date: {
        type: Schema.optionalType(Date),
    }
}) ;

const filterSchema = new Schema({
    filter:{
        type: String
    },
    filterList: {
        type: [listFilter],
    },
    radioFilter: {
        type: Schema.optionalType(String),
    }
});


class FilterForm extends React.Component {

    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = {
            pickDate: false
        };
        this.eventsEmitter = new FormEventsEmitter();
        this.eventsEmitter.listen('modelChange', this.handleChangeModel);
    }

    handleChangeModel = (change) => {
        console.log(change);
        if(change.name === 'form.radioFilter'){
            this.setState({ pickDate: change.value === 'pickDate' })
        }
    };

    handleApply = () => {
        const model = this.formRef.current.state.model;
        console.log("apply", model);
        alert("Check console");
    };

    handleSave = () => {
        const model = this.formRef.current.state.model;
        console.log("save", model);
        filtersApi.save(model).then((result) => {
            console.log(result);
            alert("Check console");
        });
    };

    setFormModel = (model) => {
        // Bug in form lib
        for(let key in model){
            if(model.hasOwnProperty(key))
            {
                this.formRef.current.setModel(key, model[key]);
            }
        }
    };

    handleReset = () => {
        filtersApi.get().then((result) => {
            this.setFormModel(result.data);
        });
    };

    render(){
        return (
            <Form
                ref={this.formRef}
                className="filter-form"
                eventsEmitter={this.eventsEmitter}
                schema={filterSchema}
                model={initialFilter}
                onError={(errors, model) => console.log('error', errors, model)}>
                <div className="fields-row">
                    <label>Filterbezeichnung</label>
                    <div className="items">
                        <TextField
                            name="filter"
                            type="text"
                            placeholder="Main Filter 4"
                        />
                    </div>
                </div>
                <div className="fields-row">
                    <label>Filterbedingunen</label>
                    <ListField
                        name="filterList"
                        addButton={{ value: "+"}}
                        removeButton={{ value: "-"}}
                        minLength={1}
                        wrapperClassName="filter-list"
                        className="filter-list-items"
                    >
                        <ObjectField wrapperClassName={"items"}>
                            <SelectField
                                name="filter1"
                                options={filterOptions1}
                            />
                            <SelectField
                                wrapperClassName="select-wrp"
                                name="filter2"
                                options={filterOptions2}
                            />
                            {this.state.pickDate ? (
                                <DateSelectField
                                    name="filter3Date"
                                />
                            ) : (
                                <TextField
                                    name="filter3"
                                    placeholder="Text"
                                />
                            )}
                        </ObjectField>
                    </ListField>

                </div>
                <div className="fields-row">
                    <label>Eintrag soil</label>
                    <div className="items">
                        <RadioGroupField
                            name="radioFilter"
                            options={radioFilterOptions}
                        />
                    </div>
                </div>
                <div className="fields-row">
                    <label />
                    <div className="items">
                        <button type="button" onClick={this.handleApply}>Apply</button>
                        <button type="button" onClick={this.handleSave}>Save</button>
                        <button type="button" onClick={this.handleReset}>Load from server</button>
                    </div>
                </div>
            </Form>
        )
    }
}

export default FilterForm;