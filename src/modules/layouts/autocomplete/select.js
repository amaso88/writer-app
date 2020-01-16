import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';

export default class SelectWidget extends Component {
	static propTypes = {
		options: PropTypes.array.isRequired,
		handleChange: PropTypes.func.isRequired,
		value: PropTypes.array.isRequired,
	}
	
	state = {
		isLoading: false,
		options: this.props.options,
		// value: [],
	};

	// componentDidMount() {
	// 	console.log(this.props.value);
	// }

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	handleChange = (newValue, actionMeta) => {
		// this.setState({ value: newValue });
		this.props.handleChange( newValue, actionMeta);
	};

	render() {		
		return (
			<Select
				isClearable
				isMulti={this.props.isMulti}
				// isDisabled={isLoading}
				// isLoading={isLoading}
				onChange={this.handleChange}				
				options={this.props.options}
				value={this.props.value && this.props.value.length > 0 ? this.props.value : [] }
				className='text-dark multi-select-options'
			/>
		)
	}
}
