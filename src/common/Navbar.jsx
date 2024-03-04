import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";

const pages = [
  { name: "HOME", linkPath: "https://socalhoa.com/" },
  {
    name: "REQUEST A PROPOSAL",
    linkPath: "https://socalhoa.com/request-a-proposal-1",
  },
];
const pagesForMobile = [
  { name: "HOME", linkPath: "https://socalhoa.com/" },
  {
    name: "REQUEST A PROPOSAL",
    linkPath: "https://so-cal-proposal-form.vercel.app/",
  },
  {
    name: "ACCOUNTING & BOOKKEEPING",
    linkPath: "https://socalhoa.com/accounting-%26-bookkeeping",
  },
  {
    name: "YOUR TAXES, SIMPLIFIED",
    linkPath: "https://socalhoa.com/your-taxes%2C-simplified",
  },
  {
    name: "FINANCIAL SERVICES",
    linkPath: "https://socalhoa.com/financial-services",
  },
];

const settings = [
  {
    name: "ACCOUNTING & BOOKKEEPING",
    linkPath: "https://socalhoa.com/accounting-%26-bookkeeping",
  },
  {
    name: "YOUR TAXES, SIMPLIFIED",
    linkPath: "https://socalhoa.com/your-taxes%2C-simplified",
  },
  {
    name: "FINANCIAL SERVICES",
    linkPath: "https://socalhoa.com/financial-services",
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="https://socalhoa.com/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Oswald, arial, Sans-Serif",
                fontWeight: 700,
                letterSpacing: "0",
                color: "#55a630",
                textDecoration: "none",
                fontSize: "20px",
                whiteSpace: "pre-line",
                maxWidth: "300px",
                lineHeight: "1.2",
              }}
            >
              SoCal Financial Services & HOA Property Management
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx:2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                  href={page.linkPath}
                >
                  {page.name}
                </Link>
              ))}
              <Box>
                <Tooltip title="Open settings">
                  <Link
                    onClick={handleOpenUserMenu}
                    sx={{
                        mx:2,
                        my: 2,
                        color: "black",
                        display: "block",
                        textDecoration: "none",
                      }}
                  >
                    MORE
                  </Link>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseUserMenu}>
                      <Link href={page.linkPath} textAlign="center" sx={{ textDecoration:"none", color:"black"}}>
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Oswald, arial, Sans-Serif",
                  fontWeight: 700,
                  letterSpacing: "0",
                  color: "black",
                  textDecoration: "none",
                  fontSize: "20px",
                }}
              >
                (818) 900-4041
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesForMobile.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.linkPath} textAlign="center" sx={{ textDecoration:"none", color:"black"}}>
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "Oswald, arial, Sans-Serif",
              fontWeight: 700,
              letterSpacing: "0",
              color: "black",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            (818) 900-4041
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
