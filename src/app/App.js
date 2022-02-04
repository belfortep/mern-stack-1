
import React from "react";
import { } from 'react-router-dom';

class App extends React.Component {

    constructor() {
        super();

        this.state = { title: '', description: '', tasks: [], _id: '' };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);


    }

    addTask(e) {
        if (this.state._id != '') {

            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Tarea actualizada' });
                    this.setState({ title: '', description: '', _id: '' });
                    this.fetchTasks();
                })

        } else if (this.state._id == '') {
            console.log(this.state);
            //enviando la informacion con FETCH
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Tarea guardada' });
                    this.setState({ title: '', description: '' });
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }


        e.preventDefault();
    }

    fetchTasks(e) {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
            });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    deleteTask(id) {
        if (confirm('Desea eliminar esta tarea?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Tarea eliminada :C' });
                    this.fetchTasks();
                })
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    handleChange(e) {

        if (e.target.name == "title") {
            this.setState({
                title: e.target.value
            });

        } else if (e.target.name == "description") {
            this.setState({
                description: e.target.value
            });
        }



    }



    render() {
        return (
            <div>
                {/* NAVEGACION*/}
                <nav className="light-blue darken-4">

                    <div className="container">
                        <a className="brand-logo" href="/">MERN-STACK</a>
                    </div>

                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Task Titulo" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.description} name="description" onChange={this.handleChange} placeholder="Task Descripcion" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                        <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}><i className="material-icons">edit</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;