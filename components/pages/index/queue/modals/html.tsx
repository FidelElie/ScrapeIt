// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Components
import ModalContainer from "../../../../misc/modals";
import Button from "../../../../misc/buttons";
import { Checkbox, Input } from "../../../../misc/forms";

// TODO make this less shit
export default function HtmlModal(props) {
  const {html, htmlModal, openHtmlModal} = props;

  const closeModal = () => { openHtmlModal(false); }

  return (
    <ModalContainer
      isOpen={htmlModal}
      onClose={closeModal}
      contentClassName="max-w-3xl"
    >
      <span className="text-gray-500 text-xl">HTML Output</span>
      <hr className="my-5" />
      <div className="h-96 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <pre>
          <code>
            { html }
          </code>
        </pre>
      </div>
      <hr className="my-5"/>
      <div className="flex justify-end">
        <Button onClick={closeModal}>
          Close
        </Button>
      </div>
    </ModalContainer>
  )
}
