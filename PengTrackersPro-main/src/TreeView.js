import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { pengTreeData } from './pengTreeData';
import useLocalStorage from "use-local-storage";

//Shows the penguin species organized in a tree view.
function TreeView({ changeSearchQuery, treeData }) {

    //Handles the modal being open or closed
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Dark mode state, retrieved from local storage
    const [isDark] = useLocalStorage("isDark", false);

    return (
        <>
            {/* Button to open the modal */}
            <Button variant="dark" onClick={handleOpenModal}>
                Open Tree View
            </Button>

            {/* Modal containing the tree */}
            <Modal show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header className='modalHeader' data-theme={isDark ? "dark" : "light"} closeVariant='white' closeButton>
                    <Modal.Title>Species Tree</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Tree Visualization */}
                    <div style={{ height: '550px', overflow: 'auto' }}>
                        <Tree
                            data={pengTreeData}
                            initialDepth={1}
                            orientation="vertical"
                            pathFunc="step"
                            separation={{siblings:2, nonSiblings:2}}
                            translate={{ x: 200, y: 200 }}
                            zoom={0.5}
                            zoomable
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TreeView;