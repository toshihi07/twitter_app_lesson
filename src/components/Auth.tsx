import React,{ useState } from 'react';
import styles from './Auth.module.css';
import { useDispatch } from 'react-redux'
import { auth,provider,storage } from "../features/firebase"


import {
  Avatar,
  Button ,
  CssBaseline ,
  TextField ,
  FormControlLabel,  
  Checkbox ,
  Link  ,
  Paper ,
  Box ,
  Grid , 
  Typography ,
} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from "@material-ui/icons/Email";




const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    
    backgroundImage: 'url(https://images.unsplash.com/photo-1610472413858-c0c0ae98e670?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [disabled, setDisabled] = useState(false)
  //async()
  const signInGoogle = async () => {
    console.log(auth);
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

    //async()
    const signInEmail = async () => {
      await auth.signInWithEmailAndPassword(email,pw);
    };

    const signUpEmail = async () => {
      await auth.createUserWithEmailAndPassword(email,pw);
    };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           {isLogin? "Login":"register" }
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPw(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled}
              startIcon={<EmailIcon />}
              onClick={
                isLogin ? async() => {
                  try {
                    signInEmail();
                  }
                  catch(err) {
                    alert(err.message);
                  }
                }
                : async() => {
                  try {
                    await signUpEmail();
                  }
                  catch(err) {
                    alert(err.message);
                  }
                }
            }
            >
            {isLogin? "Login":"register" }
            </Button>
            <Grid container>
              <Grid item xs>
                <span className={styles.login_reset}>forgot password?</span>
              </Grid>
              <Grid item xs>
                <span className={styles.login_toggleMode} onClick={()=>setIsLogin(!isLogin)}>{isLogin? "Login":"register"}</span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInGoogle}
            >
              Sign In with Google
            </Button>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;