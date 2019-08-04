import * as React from "react";
import "../../../styles/services.css"
import {Col, Row} from "react-grid-system";
import {Header} from "semantic-ui-react";
import ServiceUsageItem from "./ServiceUsageItem";
import Detail from "../../common/Detail";

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
                    <div className={'empty-service-usage-detail-box'}>
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