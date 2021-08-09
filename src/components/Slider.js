import React, { Component } from 'react'
import api from "../apis/api"
import './Slider.css'

export default class Slider extends Component {
    state = {
        list: [],
        page: 2,
        active: 0,
        loader: false
    }
    componentDidMount() {
        this.fetchdata(5 + "&page=1");
    }
    fetchdata = async i => {
        this.setState({ loader: true })
        const response = await api.get("?limit=" + i);
        // console.log(response.data);
        this.setState(prevState => ({
            list: [...prevState.list, ...response.data],
            loader: false,
            active: this.state.active + 1
        }))
    }
    onclickHander = (index) => {
        if (this.state.list.length === index + 1) {
            this.setState({ page: this.state.page + 1 })
            this.fetchdata(5 + "&page=" + this.state.page);
        } else {
            this.setState({
                active: this.state.active + 1
            })
        }
    }
    render() {
        const { active, list, loader } = this.state;
        return (
            <div id='carousel ' className='container rounded mt-1 '>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    {/* loader */}
                    {loader ? <div className='h6 mx-1 bg-light d-flex align-items-center justify-content-center'>
                        <span className="spinner-border text-primary mx-1" role="status" />
                        Loading.....</div> : null}
                    {/* images */}
                    <div className="carousel-inner">
                        {list.map((photo, index) => {
                            return (<div className={"carousel-item " + (index === 0 ? ' active' : ' ')} key={photo.id + index}>
                                <img src={photo.download_url} className="img-fluid d-flex justify-content-center" alt="..." />
                            </div>)
                        })}
                    </div>
                    <button className={"carousel-control-prev " + (active === 1 ? "visually-hidden" : " ")}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                        onClick={() => {
                            this.setState({
                                active: this.state.active - 1
                            })
                        }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                        onClick={() => {
                            this.onclickHander(active)
                        }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        )
    }
}
