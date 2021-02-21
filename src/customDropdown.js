import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { getDisplayName } from './helper';

export class CustomDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {},
            selectedIndex: 0,
            items: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.renderDropdownItems = this.renderDropdownItems.bind(this);
    }

    componentDidMount() {
        console.log('Did Mount', this.props);
        this.setState({
            items: this.props.items,
            selectedItem: this.props.items[0]
        });
    }

    componentDidUpdate(prevProps) {
        console.log('Did Update', this.props);
        if (prevProps.items !== this.props.items) {
            // Extra re-render for every update
            this.setState({
                items: this.props.items,
            });
        }
    }

    handleSelect(selectedIndex) {
        console.log('selected:', selectedIndex);
        const { items } = this.state;

        const selectedItem = items[selectedIndex];
        this.setState({
            selectedIndex: selectedIndex,
            selectedItem: selectedItem,
        },
            () => this.props.onSelect(this.state.selectedIndex)
        );
    }

    renderDropdownItems(items) {
        return (items.map(item =>
            <Dropdown.Item
                key={item.id}
                eventKey={item.id}
            >
                {getDisplayName(item)}
            </Dropdown.Item>));
    }

    render() {
        const { items, selectedItem } = this.state

        console.log(items, items.length > 0)

        return (
            <div className="dropdown">
                {items.length > 0 &&
                    <DropdownButton
                        title={getDisplayName(selectedItem)}
                        id="dropdown-menu"
                        onSelect={this.handleSelect}
                    >
                        {this.renderDropdownItems(items)}
                    </DropdownButton>
                }
            </div>
        );
    }
}