import * as React from "react";
import Axios from "axios";
import Config from "../../bootstrap/Config";
import * as AutoComplete from "react-autocomplete";

interface Props {
    onItemMemberSelected: (item: any) => void;
    error?: boolean;
}

interface State {
    suggestions: any[];
    value: string;
    selected: string | null;
    loading: boolean;
}

export default class AutoCompleteMember extends React.Component<Props, State> {

    private cancelSourceRequest: any = null;

    constructor(props: any) {
        super(props);
        this.state = {selected: null, value: '', suggestions: [], loading: false};
    }

    private loadSuggestions = (value: any) => {

        if (this.cancelSourceRequest) {
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
                this.setState({loading: false, suggestions: res.data});
            })
            .catch(() => {
                this.setState({loading: false});
            });
    };

    render() {
        return <AutoComplete
            inputProps={{
                style: {
                    padding: 16, borderRadius: 3, border: 'none', backgroundColor: this.props.error ? '#E00' : '#EEE',
                    fontSize: 18, width: '100%', textAlign: 'center'
                },
                placeholder: 'NAME OR ID ...'
            }}
            menuStyle={{zIndex: 100, left: 0, top: 0, position: 'absolute'}}
            wrapperStyle={{position: 'relative', display: 'inline-block', width: '100%'}}
            value={this.state.value}
            items={this.state.suggestions}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
                this.setState({selected: item}, () => {
                    this.props.onItemMemberSelected && this.props.onItemMemberSelected(item);
                });
                this.setState({value});
            }}
            onChange={(event, value) => {
                if (this.state.selected) {
                    this.setState({selected: null}, () => {
                        this.props.onItemMemberSelected && this.props.onItemMemberSelected(null);
                    });
                }
                this.setState({value});
                this.loadSuggestions(value);
            }}
            renderItem={(item, isHighlighted) => (
                <div style={{
                    background: isHighlighted ? '#EEE' : '#FFF', padding: 6,
                    fontSize: 15, color: isHighlighted ? 'blue' : 'black'
                }}
                     className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                     key={item.id}>
                    {item.name}
                </div>
            )}
        />

    }

}