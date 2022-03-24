import React from 'react'
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductItem from '../Products/Product/ProductItem';
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";

const Category = ({ cat , products, onAddToCart }) => {

  console.log("object: ", cat)
  console.log(products)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "#F6F6F6",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  }));


  return (
    
    <>
    <h2>{cat.name}</h2>
    <div>
        <Box sx={{ flexGrow: 1 }}>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            { products
              .filter((prod) => prod.categories[0].id === cat.id)
              .map((filteredcat, key) => (
                <>
                  <Grid item xs={2} sm={4} md={4} key={filteredcat.id}>
                    <Item>
                      <ProductItem
                        key={key}
                        product={filteredcat}
                        onAddToCart={onAddToCart}
                      />
                    </Item>
                  </Grid>
                </>
              ))}
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default Category