import * as React from "react";
import {useState} from "react";
import "./../../styles/services.css"
import Detail from "../common/Detail";
import {Col, Row} from "react-grid-system";
import {Header} from "semantic-ui-react";

interface Props {
    services: any[];

}

interface State {
    selectedItem: any;
}

export default class ServiceUsageCollection extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {selectedItem: null}
    }

    render(): JSX.Element {
        return <div>

            {
                this.state.selectedItem ?
                    <div className={'service-usage-detail animated fadeIn'}>
                        <Row>
                            <Col>
                                <Detail value={this.state.selectedItem.memberName} label={"Member"}/>
                                <Detail value={this.state.selectedItem.serviceName} label={"Service"}/>
                                <Detail value={this.state.selectedItem.time} label={"Time"}/>
                                <Detail value={this.state.selectedItem.referencePerson} label={"Reference Person"}/>
                                <Detail value={this.state.selectedItem.notes} label={"Notes"}/>
                            </Col>
                            <Col>
                                <Detail value={this.state.selectedItem.price} label={"Price"}/>
                                <Detail value={this.state.selectedItem.commission} label={"Commission"}/>
                                <Detail value={this.state.selectedItem.count} label={"Count"}/>
                                <Detail value={this.state.selectedItem.discount} label={"Discount"}/>
                                <Detail value={this.state.selectedItem.finalPrice} label={"Final Price"}/>
                            </Col>
                        </Row>
                    </div> :
                    <div style={{
                        height: 234,
                        background: '#EFEFEF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                    }}>
                        <Header size={"small"}>SELECT ITEM</Header>
                    </div>
            }


            <div className={'service-usage-list'}>
                <div className={'service-usage-item captions'}>
                    <span className={'service-name'}>Service</span>
                    <span>Time</span>
                    <span>Ref.Person</span>
                    <span>Price</span>
                    <span>Count</span>
                    <span>Discount</span>
                    <span>Final Price</span>
                </div>
                {
                    this.props.services.map((item: any) => {
                        return <ServiceUsageItem key={item.id} item={item}
                                                 onItemSelected={(item: any) => {
                                                     this.setState({selectedItem: item});
                                                 }}/>
                    })
                }
            </div>
        </div>
    }

}

function ServiceUsageItem(props: any) {

    const [selected, setSelected] = useState(false);

    return <div className={`service-usage-item ${selected ? 'selected' : ''}`}
                onClick={() => {
                    console.log(props.item, !selected);
                    props.onItemSelected && props.onItemSelected(props.item, !selected);
                    setSelected(!selected);
                }}>
        <span className={'service-name'}>{props.item.serviceName}</span>
        <span>{props.item.time}</span>
        <span>{props.item.referencePerson}</span>
        <span>{props.item.price}</span>
        <span>{props.item.count}</span>
        <span>{props.item.discount}</span>
        <span>{props.item.finalPrice}</span>
    </div>
}