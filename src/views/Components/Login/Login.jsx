import React, { useCallback, useState } from 'react';
import logo_quora from '../../Styled/images/Quora.png';
import { auth, provider } from '../../../backend/database/firebase';
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    } from 'firebase/auth'

import google from '../../Styled/images/google.png';
import facebook from '../../Styled/images/facebook.png'

const Login = () => {

    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlerEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, [email]);

    const handlerPassword = useCallback((e) => {
        setPassword(e.target.value);
    }, [password]);

    const handlerLogin = useCallback((e) => {
        e.preventDefault();

        if(email.length == 0 || password.length == 0){
            alert('check login form');
            return;
        }

        // 파이어베이스에서 제공하는 로그인 메서드들이 있다
        (async () => {
           try{
                const result = await signInWithEmailAndPassword(auth, email, password);
                console.log(result);             
           } catch(e) {
                console.error(e);
           }                 
        })();      
        
        setEmail('');
        setPassword('');
    }, [email, password]);

    const handlerRegister = useCallback((e) => {
        e.preventDefault();
 
        (async () => {
            try{
                const result = await createUserWithEmailAndPassword(auth, email, password);
                
                // 회원가입이 성공적으로 이루어졌으면
                if(result){
                    console.log(result);
                }
            } catch(e){
                console.error(e);
            }

            setEmail('');
            setPassword('');
        })();
        
    }, [email, password]);    

    const signInWithGoogle = useCallback(() => {
        
        (async () => {
            try{
                const result = await signInWithPopup(auth, provider);
                console.log(result);
            } catch(e){
                console.error(e);
            }       
        })();
    }, []);

    return (
        <div className='login'>
            <div className="login_container">
                <div className="login_logo">
                    <img src={logo_quora} alt="" />
                </div>
                <div className="login_desc">
                    <p>This is LoginPage... Please Login our site</p>
                    <h2>Quora</h2>
                </div>
                <div className="login_auth">               
                    <div className='login_authOptions'>
                        <p className='login_title'>Other</p>
                        <div className="login_authOption">
                            <img className='login_googleAuth' src={google} alt='login_google' />
                            <p onClick={signInWithGoogle}>구글 아이디로 로그인</p>
                        </div>
                        <div className="login_authOption">
                            <img className='login_facebookAuth' src={facebook} alt='login_facebook' />
                            <p>페이스북 아이디로 로그인</p>
                        </div>
                        <div className='login_auth_help'>
                            <p><span>이메일로 회원가입하기</span> 이메일로 회원가입시 본사의 개인정보정책과 서비스 <span>제공 정책</span>에 대해 동의하는 것으로 간주합니다</p>
                        </div>
                    </div>
                    <div className="login_authDesc">
                        <p className='login_title'>Login</p>
                        <div className='login_form'>
                            <div className='login_form_input'>
                                <div className='input_wrapper'>
                                    <input type='email' placeholder='email' value={email} onChange={handlerEmail}/>
                                </div>
                                <div className='input_wrapper'>
                                    <input type='password' placeholder='passowrd' value={password} onChange={handlerPassword}/>
                                </div>                              
                            </div>                          
                            <div className='login_form_menu'>
                                <p>비밀번호 찾기</p>
                                <button type='button' onClick={handlerLogin}>로그인</button>
                            </div>                            
                        </div>
                        <div className='login_form_submit'>
                            <button type='button' onClick={handlerRegister}>회원가입</button>
                        </div>
                    </div>                    
                </div>
                <hr />
                <div className='set_language'>
                    <p>언어 설정</p>
                </div>
                <hr />
                <div className='get_link'>
                    <p>
                        About
                    </p>
                    <p>
                        Way to come
                    </p>
                    <p>
                        Business 
                    </p>
                    <p>
                        Question
                    </p>
                    <p>
                        App
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;