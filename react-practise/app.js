var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");

class CustomComponent extends React.Component {
    render() {
        var Name = this.props.name;
        var Physics = this.props.physics;
        var Chemistry = this.props.chemisry;
        var percent = (Physics+Chemistry)*100/300;
        if (percent>=60) {
            var message = Name + ", you have passed! :-)";
            var theColor = 'green';
            var img = './yay.gif';
            var size = {width:250};
        } else {
            var message = Name + ", you have failed :'-(";
            var theColor = 'red';
            var img = './sad.gif';
            var size = {width:300};
        }

        var theBreak = React.createElement("br", null, null);
        var pic = React.createElement("img", {src:img, style:size}, null);
        var element = React.createElement("h1", {style:{color:theColor,'font-family':'comic sans ms'}}, [message, theBreak, pic]);
        
        return element;
    }
}

var Billy = React.createElement(CustomComponent, {name:"Billy", physics:100, chemisry:80});
ReactDOM.render(Billy, div1);

var Bobby = React.createElement(CustomComponent, {name:"Bobby", physics:10, chemisry:40});
ReactDOM.render(Bobby, div2);