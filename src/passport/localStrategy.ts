import passport from 'passport';

import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '@entities/Users';
import LocalStrategy from 'passport-local';

const LocalStrategy = passportLocal.LocalStrategy;
