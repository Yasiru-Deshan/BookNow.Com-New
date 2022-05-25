import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import Topbar from '../../components/admincomponents/topbar/Topbar';
import Sidebar from '../../components/admincomponents/sidebar/Sidebar';
import NewMovie from '../adminpages/newMovie/NewMovie';
import AdminHome from './home/Home';
import Movie from './movie/Movie';
import MovieList from './movieList/MovieList';
import ListList from './listList/ListList';
import List from './list/List'
import NewList from './newList/NewList';

const AdminRoutes = () => {
	return (
		<>
			<Topbar />
			<div className='admin-container'>
				<Sidebar />
				<Route exact path='/admin'>
					<AdminHome />
				</Route>
				<Route exact path='/admin/newMovie'>
					<NewMovie />
				</Route>
				<Route path='/admin/movies'>
					<MovieList />
				</Route>

				<Route exact path='/admin/movie/:movieId' >
          	<Movie />
        	</Route>

				<Route path='/admin/lists'>
					<ListList />
				</Route>
				<Route path='/admin/list/:listId'>
					<List />
				</Route>
				<Route path='/admin/newlist'>
					<NewList />
				</Route>
			</div>
		</>
	);
};

export default AdminRoutes;
