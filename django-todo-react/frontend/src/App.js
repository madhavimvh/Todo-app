import './App.css';
import React, {Component} from 'react';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [], 
      activeItem: {
        title:'',
        completed: false,
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  };

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')
    fetch('http://127.0.0.1:8000/api/todos/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList: data
      })
      )
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log(name)
    console.log(value)

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title:value
      }
    })
  }


  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state.activeItem)
    axios.post("http://localhost:8000/api/todos/", this.state.activeItem)
          .then(res => this.refreshList());
  };


  render() {
    var tasks = this.state.todoList
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
                <div className="flex-wrapper">
                  <div style={{flex: 6}}>
                    <input onChange={this.handleChange} className="form-control" id="title" type="text" name="title" placeholder="Add task"></input>
                  </div>
                  <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit"></input>
                  </div>
                </div>
            </form>
          </div>
          <div id="list-wrapper">
              {tasks.map(function(task, index){
                return(
                   <div key={index} className="task-wrapper flex-wrapper">
                     <div style={{flex:7}}>
                      <span>{task.title}</span>
                     </div>

                     <div style={{flex:1}}>
                      <button className="btn btn-sm btn-outline-info">Edit</button>
                     </div>

                     <div style={{flex:1}}>
                      <button className="btn btn-sm btn-outline-dark delete">-</button>
                     </div>
                     
                   </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
