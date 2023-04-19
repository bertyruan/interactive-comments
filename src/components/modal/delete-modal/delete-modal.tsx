import "./delete-modal.scss";

type DeleteModalProps = {
  cancel: () => void;
  confirm: () => void;
};

export function DeleteModal(props: DeleteModalProps) {
  const { cancel, confirm } = props;
  return (
    <div className="stack m-delete">
      <h2 className="delete-title">Delete comment</h2>
      <p className="delete-desc">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="file delete-cta">
        <button onClick={cancel} className="button button__post button-cancel">
          No Cancel
        </button>
        <button
          onClick={confirm}
          className="button button__post button-confirm"
        >
          Yes Delete
        </button>
      </div>
    </div>
  );
}
