import Navigation from "./Navigation/Navigation";
import styles from './Header.module.scss';
import { Container } from "@mui/material";

export default function Header() {
    return (
        <Container component="header" className={styles.header} sx={{borderBottomColor: 'primary.main'}}>
            <Navigation />
        </Container>
    )
}