'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Col, Container, Row } from 'react-bootstrap';
import MainView from './components/MainView';
import Header from './components/Header';

export default function Home() {
    const { user } = useUser();

    let view = null;
    if (user) {
        view = <MainView user={user} />;
    } else {
        view = <AnonymousMainView />;
    }

    return (
        <Container className="container py-4">
            <Row>
                <Col className="col-8 offset-2 px-5">
                    <Row>
                        <div className="border-bottom">
                            <Header user={user} />
                        </div>
                    </Row>
                    <Row className="py-4 px-2">
                        {view}
                    </Row>
                    <Row>
                        <div className="border-top">
                            <footer className="pt-3 pb-2 d-flex justify-content-end">
                                <small />
                            </footer>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

function AnonymousMainView() {
    return (
        <div>
            <div className="text-center pb-3">
                <h1>You have to login to see content.</h1>
            </div>

            <div className="d-flex justify-content-center">
                <div className="d-grid gap-1 col-6">
                    <a className="btn btn-primary" href="/api/auth/login">Login</a>
                </div>
            </div>
        </div>
    );
}
