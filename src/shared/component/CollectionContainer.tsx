import * as React from "react";
import {Header, Icon, Loader} from "semantic-ui-react";

interface Props {
    loading: boolean;
    error: boolean;
    collection: any[];
    renderCollection: () => any;
    showEmpty?: boolean;

    renderErrorComponent?: () => any;
    errorComponent?: any;
    errorMessage?: string;


    renderLoadingComponent?: () => any;
    loadingComponent?: any;
    loadingMessage?: string;

    renderEmptyComponent?: () => any;
    emptyComponent?: any;
    emptyMessage?: string;
}

export default class CollectionContainer extends React.Component<Props> {

    render(): JSX.Element {
        let element = null;

        if (this.props.loading) {
            element = this.getLoadingElement();
        } else if (this.props.error) {
            element = this.getErrorElement();
        } else if (this.props.collection === null || (this.props.showEmpty !== false && this.props.collection.length === 0)) {
            element = this.getEmptyElement();
        } else {
            element = this.props.renderCollection();
        }
        return (
            <div className={'collection-container'}>
                {
                    element
                }
            </div>
        )
    }

    private static getElement(renderFunc?: () => any, component?: any, defaultComponent?: any) {
        if (renderFunc) {
            return renderFunc();
        } else if (component) {
            return component;
        } else {
            return defaultComponent;
        }
    }

    private getLoadingElement(): any {
        return CollectionContainer.getElement(this.props.renderLoadingComponent, this.props.loadingComponent,
            <div style={{textAlign: 'center', padding: 24}}>
                <Loader size={"large"} inline
                        active>{this.props.loadingMessage ? this.props.loadingMessage : "Loading..."}</Loader>
            </div>
        )
    }

    private getErrorElement(): any {
        return CollectionContainer.getElement(this.props.renderErrorComponent, this.props.errorComponent,
            <div style={{textAlign: 'center', padding: 24}}>
                <Icon name={'exclamation triangle'} size={"massive"} color={'red'}/>
                <Header size={"small"}>
                    {this.props.errorMessage ? this.props.errorMessage : 'something wrong happened , please check your internet connection'}
                </Header>
            </div>)
    }

    private getEmptyElement(): any {
        return CollectionContainer.getElement(this.props.renderEmptyComponent, this.props.emptyComponent,
            <div style={{textAlign: 'center', padding: 24}}>
                <Icon name={'database'} size={"huge"}/>
                <Header size={"small"}>
                    {this.props.emptyMessage ? this.props.emptyMessage : 'Empty'}
                </Header>
            </div>)
    }

}