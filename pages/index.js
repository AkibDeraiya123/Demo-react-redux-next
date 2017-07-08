import React from 'react';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Head from '../components/commonComponents/Head';

export default class extends React.Component {
	render() {
		return (
	      	// eslint-disable-next-line react/jsx-filename-extension
	      	<div>
	      		<Head />
      			<Grid>
      				<Row style={{textAlign: "center"}}>
      				  <h1>Welcome To Demo App</h1>
      				  <p>
  					    Please <a href="/demo">Click Here</a> To Fetch Data By BussinessId or BussinessName
  			   		  </p>
      				</Row>
      			</Grid>
      	
	      	</div>
	    )
	}
}