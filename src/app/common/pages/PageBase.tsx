import * as React from "react";
import {Container} from "react-grid-system";
import MenuOption from "./MenuOption";
import PageBaseMenuOptions from "./PageBaseMenuOptions";
import {RouteProps} from "react-router";
import PageRouteSwitch from "./PageRouteSwitch";

interface Props {
    menuOptions: MenuOption[];
    routes: RouteProps[];
}

export default class PageBase extends React.Component<Props> {

    render(): JSX.Element {
        return (
            <Container style={{margin: 24}} fluid={true}
                       className={'page'}>

                <div className={'page-container'}>

                    <PageBaseMenuOptions options={this.props.menuOptions}/>

                    <div className={'vertical-separator'}/>

                    <div className={'option-content'}>
                        <PageRouteSwitch routes={this.props.routes}/>
                    </div>

                </div>

            </Container>
        )
    }

}