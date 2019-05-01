import React, { Component } from "react";

class Login extends Component{

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){

    }

    render(){
        return (
            <div class="card w-50 m-auto">
                <article class="card-body">
	                <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
	                <p class="text-success text-center">Some message goes here</p>
	                <form onSubmit={() => { alert('submitted') }}>
	                    <div class="form-group">
	                        <div class="input-group">
		                        <div class="input-group-prepend">
		                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		                        </div>
		                        <input name="" class="form-control" placeholder="Email address" type="email"/>
	                        </div> 
	                    </div>
	                    <div class="form-group">
	                        <div class="input-group">
		                        <div class="input-group-prepend">
		                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
		                        </div>
	                            <input class="form-control" placeholder="Password" type="password"/>
	                        </div> 
	                    </div> 
	                    <div class="form-group">
	                        <button type="submit" class="btn btn-primary btn-block"> Login  </button>
	                    </div> 
	                </form>
                </article>
            </div>
        )
    }
}


export default Login;