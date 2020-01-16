import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable';

export default class CreatableWidget extends Component {
	static propTypes = {
		options: PropTypes.array.isRequired,
		handleChange: PropTypes.func.isRequired,
		onCreateOption: PropTypes.func.isRequired,
	}

	state = {
		isLoading: false,
		options: this.props.options,
		// value: [],
	};

	handleChange = (newValue, actionMeta) => {
		// this.setState({ value: newValue });
		this.props.handleChange( newValue, actionMeta);
	};

	render() {
		return (
			<CreatableSelect
				isClearable
				isMulti={this.props.isMulti}
				// isDisabled={isLoading}
				// isLoading={isLoading}
				onChange={this.handleChange}
				onCreateOption={this.props.onCreateOption}
				options={this.props.options}
				value={this.props.value && this.props.value.length > 0 ? this.props.value : [] }
				className='text-dark multi-select-options'
		/>
		)
	}
}
