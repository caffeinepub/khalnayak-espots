import { j as jsxRuntimeExports, bF as Root, bG as Trigger, bH as Content, z as cn, bI as Close, X, bJ as Title, bK as Description, bL as Portal, bM as Overlay, aZ as DocumentSnapshot, a_ as QueryCompositeFilterConstraint, a$ as QueryConstraint, b0 as QueryDocumentSnapshot, b1 as QueryFieldFilterConstraint, b2 as QueryOrderByConstraint, b3 as QuerySnapshot, b4 as SnapshotMetadata, b5 as addDoc, b6 as executeWrite, b7 as getDoc, b8 as getDocs, b9 as orderBy, ba as query, bb as setDoc, bc as updateDoc, bd as where, be as AbstractUserDataWriter, bf as Bytes, bg as CollectionReference, bh as DocumentReference, bi as FieldPath, bj as FieldValue, bk as Firestore, bl as FirestoreError, bm as GeoPoint, bn as Query, bo as Timestamp, bp as VectorValue, bq as __PRIVATE_AutoId, br as ByteString, bs as DatabaseId, bt as DocumentKey, bu as __PRIVATE_EmptyAuthCredentialsProvider, bv as FieldPath$1, bw as __PRIVATE_cast, bx as __PRIVATE_logWarn, by as __PRIVATE_validateIsNotUsedTogether, bz as collection, bA as connectFirestoreEmulator, bB as doc, bC as ensureFirestoreConfigured, bD as getFirestore, bE as serverTimestamp } from "./index-BY_LkDWL.js";
const index_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractUserDataWriter,
  Bytes,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  FieldValue,
  Firestore,
  FirestoreError,
  GeoPoint,
  Query,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  QuerySnapshot,
  SnapshotMetadata,
  Timestamp,
  VectorValue,
  _AutoId: __PRIVATE_AutoId,
  _ByteString: ByteString,
  _DatabaseId: DatabaseId,
  _DocumentKey: DocumentKey,
  _EmptyAuthCredentialsProvider: __PRIVATE_EmptyAuthCredentialsProvider,
  _FieldPath: FieldPath$1,
  _cast: __PRIVATE_cast,
  _logWarn: __PRIVATE_logWarn,
  _validateIsNotUsedTogether: __PRIVATE_validateIsNotUsedTogether,
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  ensureFirestoreConfigured,
  executeWrite,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
}, Symbol.toStringTag, { value: "Module" }));
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
export {
  Dialog as D,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogDescription as d,
  DialogTrigger as e,
  index_esm as i
};
