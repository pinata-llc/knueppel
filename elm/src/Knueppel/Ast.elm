module Knueppel.Ast exposing (Expr(..), Literal(..), Operator(..))


type Literal
    = Number Float
    | String_ String
    | List_ (List Expr)


type Operator
    = Add
    | Sub
    | Mul
    | Div
    | Lt
    | Lte
    | Equals
    | Gt
    | Gte
    | Diff
    | And
    | Or
    | In


type Expr
    = Literal Literal
    | Binary Expr Operator Expr
    | Identifier String
