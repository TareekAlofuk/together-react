import * as React from "react";
import Axios from "axios";
import Config from "../../bootstrap/Config";
import * as AutoComplete from "react-autocomplete";

interface Props {
}

interface State {
    suggestions: any[];
    value: string;
    loading: boolean;
}

export default class AutoCompleteEmployee extends React.Component<Props, State> {

    private cancelSourceRequest: any = null;
    private requestTimer: any;

    constructor(props: any) {
        super(props);
        this.state = {value: '', suggestions: [{name: 'one', id: 10}], loading: false};
    }

    private loadSuggestions = (value: any) => {
        console.log('loadSuggestions', value);

        if (this.cancelSourceRequest) {
            console.log('cancel');
            this.cancelSourceRequest.cancel();
        }

        this.cancelSourceRequest = Axios.CancelToken.source();
        this.setState({suggestions: [], loading: true});

        const url = Config.SERVER_URL + "api/members/auto-complete-suggestions";
        Axios.get(url, {
            cancelToken: this.cancelSourceRequest.token,
            params: {query: value}
        })
            .then(res => {
                console.log(res.data);
                this.setState({loading: false, suggestions: res.data});
            })
            .catch((error) => {

                console.log('error', error);
                this.setState({loading: false});
            });
    };


    render() {
        return <AutoComplete
            inputProps={{id: 'states-autocomplete'}}
            wrapperStyle={{position: 'relative', display: 'inline-block'}}
            value={this.state.value}
            items={this.state.suggestions}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
                console.log('onSelect', value, item);
                this.setState({value});
            }}
            onChange={(event, value) => {
                console.log(event, value);
                this.setState({value});
                this.loadSuggestions(value);
            }}

            renderItem={(item, isHighlighted) => (
                <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                     key={Math.random()}>
                    {item.name}
                </div>
            )}
        />

    }

}