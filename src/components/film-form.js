import React, { Component } from 'react';
import {
    Form,
    Grid,
    Button
} from 'semantic-ui-react';
import {
    Field,
    reduxForm
} from 'redux-form';
import classnames from 'classnames';

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = {
            message: 'You need to provide a Name'
        };
    }
    return errors;
};

class FilmForm extends Component {

    componentWillReceiveProps = (nextProps) => {
        const { film } = nextProps;
        if (film.id !== this.props.film.id) {
            this.props.initialize(film);
        }
    };

    renderField = ({ input, label, labelhint, type, meta: { touched, error } }) => (
        <Form.Field className={classnames({ error: touched && error })}>
            <label>{label}</label>
            <input {...input} placeholder={label + ', ' + labelhint} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    render() {
        const { handleSubmit, pristine, submitting, loading, film } = this.props;
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1 style={{ marginTop: '1em' }}>{film.id ? 'Edit Film' : 'Add New Film'}</h1>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Field name="name" type="text" component={this.renderField} label="Name"/>
                        <Field name="year" type="text" component={this.renderField} label="Year"/>
                        <Field name="format" type="text" component={this.renderField} label="Format"/>
                        <Field name="actors"
                               labelhint="Arnold, Guy Richy... etc"
                               type="text" component={this.renderField} label="Actors"/>
                        <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default reduxForm({
    form: 'film',
    validate
})(FilmForm);
