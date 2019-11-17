import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		type: "dark"
	}
});

function App() {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<Layout>
					<div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis vel
						rem error molestiae autem facere, tenetur expedita pariatur odit,
						vero provident dignissimos blanditiis sed. Fugit aut doloremque
						nihil. Aut aliquam placeat hic accusantium? Aliquid, ducimus?
						Cupiditate natus quis similique, ab dolor et necessitatibus voluptas
						accusamus. Voluptatem velit omnis quia a.
					</div>
				</Layout>
			</ThemeProvider>
		</div>
	);
}

export default App;
