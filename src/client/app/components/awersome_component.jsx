import React from 'react';
var update = require('react-addons-update');

const PI = 3.1415926;
const PIE_WIDTH = 25;
const START_RAY= 30;
const STEP = 30;
var RAYS = [];
for(var i = 0; i <10; i++){
  RAYS.push(START_RAY + i*STEP);
}

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInfo: null,
      tree: [
        {title: "Zdrowie i Sprawność fizyczna", value: Math.floor((Math.random() * 10) + 1), color: "#44B3C2"},
        {title: "Rodzina i przjaciele", value: Math.floor((Math.random() * 10) + 1), color: "#F1A94E"},
        {title: "Przyjaciele", value: Math.floor((Math.random() * 10) + 1), color: "#E45641"},
        {title: "Praca", value: Math.floor((Math.random() * 10) + 1), color: "#5D4C46"},
        {title: "Rozwój osobisty", value: Math.floor((Math.random() * 10) + 1), color: "#7B8D8E"},
        {title: "Finanse", value: Math.floor((Math.random() * 10) + 1), color: "#33cc33"}
      ]
    };
  }

  showInfo(index) {
    this.setState({selectedInfo: index})
  }

  lvlDown(index) {
    var data = this.state.tree;
    var node = data[index]
    if(node.value == 1){
      return
    }
    var updatedNode = update(data[index], {value: {$set: (node.value - 1)}}); 

    var newData = update(data, {
        $splice: [[index, 1, updatedNode]]
    });
    this.setState({tree: newData});
  }

  lvlUp(index) {
    var data = this.state.tree;
    var node = data[index]
    if(node.value > 9){
      return
    }
    var updatedNode = update(data[index], {value: {$set: (node.value + 1)}}); 

    var newData = update(data, {
        $splice: [[index, 1, updatedNode]]
    });
    this.setState({tree: newData});
  }

  render() {
    var indents = [];
    var selectors = [];
    var self = this;
    this.state.tree.forEach(function(elem, index){
      for (var lvl = 0; lvl < elem.value; lvl++) {
        let circuit = 2 * PI * RAYS[lvl];
        let styles = {
          fill: "transparent",
          stroke: elem.color,
          strokeWidth: PIE_WIDTH,
          strokeDasharray: `${circuit/6.5} ${circuit}`,
          transformOrigin: "50% 50%",
          transform: `rotate(${(index % 6) * 60}deg)`
        }
        indents.push(<circle key={`${index}-${lvl}`} cx="350" cy="350" r={RAYS[lvl]} style={styles} />);

      }
      let selectorStyles = {
        width: "40px",
        height: "40px",
        backgroundColor: elem.color,
        float: "right",
        transition: "all 0.5s ease-in-out"
      }
      if(self.state.selectedInfo == index){
        selectorStyles.height = "auto";
        selectorStyles.minHeight = "40px";
        selectorStyles.width = "550px";
      }
      let infoStyle = {
        color: "#FFFFFF",
        padding: "10px",
        width: "550px"
      }
      selectors.push(<div style={selectorStyles} onClick={self.showInfo.bind(self, index)}>
          <div className={(self.state.selectedInfo == index) ? "" : "hidden"} style={infoStyle}>  
          <div className="pull-right" style={{fontSize: "36px", marginTop: "15px", marginLeft: "5px"}} onClick={self.lvlDown.bind(self, index)}>
            <span className="label label-danger label-as-badge">-</span>
          </div> 
          <div className="pull-right" style={{fontSize: "36px", marginTop: "15px", marginLeft: "5px"}} onClick={self.lvlUp.bind(self, index)}>
            <span className="label label-success label-as-badge">+</span>
          </div>
          <div className="pull-right" style={{fontSize: "36px", marginTop: "15px", marginLeft: "5px"}}>
            <span className="label label-default label-as-badge">{elem.value}</span>
          </div> 
          <h3 style={{paddingLeft: 10, textShadow: "2px 2px 2px #666666"}}>{elem.title}</h3> 
          <hr/>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker</div></div>)
      selectors.push(<br style={{clear: "both"}} />)
    })

    return(
      <div>
        <svg height="700" width="700" style={{display: "block", margin: "auto"}}>
          {indents}
          <polygon points="700,350 350,350 584,700" style={{fill: this.state.tree[0].color, opacity: 0}} onClick={self.showInfo.bind(self, 0)}/>
          <polygon points="116,700 350,350 584,700" style={{fill: this.state.tree[1].color, opacity: 0}} onClick={self.showInfo.bind(self, 1)}/>
          <polygon points="0,350 350,350 116,700" style={{fill: this.state.tree[2].color, opacity: 0}} onClick={self.showInfo.bind(self, 2)}/>
          <polygon points="116,0 350,350 0,350" style={{fill: this.state.tree[3].color, opacity: 0}} onClick={self.showInfo.bind(self, 3)}/>
          <polygon points="116,0 350,350 584,0" style={{fill: this.state.tree[4].color, opacity: 0}} onClick={self.showInfo.bind(self, 4)}/>
          <polygon points="584,0 350,350 700,350" style={{fill: this.state.tree[5].color, opacity: 0}} onClick={self.showInfo.bind(self, 5)}/>
        </svg>
        
        <div style={{position: "fixed", top: "80px", right: "0px"}}>
          {selectors}
        </div>
      </div>
    )
  }

}

export default AwesomeComponent;
