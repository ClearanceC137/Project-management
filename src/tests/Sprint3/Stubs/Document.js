import { React, useContext, useState } from 'react';



const addDocument = (documents, newDocument) => {
    if (newDocument.name !== ""){
        if (newDocument.description === ""){
            return "No description provided"
        }
        if (newDocument.poster === ""){
            return "No poster provided"
        }
        documents.push(newDocument);
        return documents
    }
    else {
        return "No new document was added to the documents"
    }
};

const deleteDocument = (documents) => {
    documents.pop();
    return documents
}

module.exports = [addDocument, deleteDocument]