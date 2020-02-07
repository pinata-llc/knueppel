module Knueppel.Parser exposing (parse)

import Knueppel.Ast exposing (Expr(..), Literal(..), Operator(..))
import Parser
    exposing
        ( (|.)
        , (|=)
        , DeadEnd
        , Parser
        , Step(..)
        , andThen
        , chompIf
        , chompWhile
        , float
        , getChompedString
        , lazy
        , loop
        , oneOf
        , run
        , spaces
        , succeed
        , symbol
        )



-- AST


parse : String -> Result (List DeadEnd) Expr
parse =
    String.toLower >> String.trim >> run expression


zeroOrMore : (Char -> Bool) -> Parser String
zeroOrMore isOk =
    succeed ()
        |. chompWhile isOk
        |> getChompedString


sorroundedBy : Char -> Parser String
sorroundedBy sc =
    let
        s =
            String.fromChar sc
    in
    succeed identity
        |. symbol s
        |= zeroOrMore (\c -> c /= sc)
        |. symbol s


list : Parser (List Expr)
list =
    succeed (\first rest -> first :: rest)
        |. symbol "["
        |. spaces
        |= lazy (\_ -> expression)
        |. spaces
        |. symbol ","
        |= loop [] listStep


listStep : List Expr -> Parser (Step (List Expr) (List Expr))
listStep items =
    succeed (\item next -> next (item :: items))
        |. spaces
        |= expression
        |. spaces
        |= oneOf
            [ succeed Loop
                |. symbol ","
            , succeed (Done << List.reverse)
                |. symbol "]"
            ]


literal : Parser Literal
literal =
    oneOf
        [ succeed String_
            |= sorroundedBy '\''
        , succeed Number
            |= float
        , succeed List_
            |= list
        ]


operator : Parser Operator
operator =
    let
        op t s =
            succeed t |. symbol s
    in
    oneOf
        [ op Add "+"
        , op Sub "-"
        , op Mul "*"
        , op Div "/"
        , op Lte "<="
        , op Lt "<"
        , op Gte ">="
        , op Gt ">"
        , op Equals "="
        , op Diff "<>"
        , op And "and"
        , op Or "or"
        , op In "in"
        ]


identifier : Parser String
identifier =
    oneOf
        [ let
            orUnderscore a c =
                a c || c == '_'
          in
          succeed ()
            |. chompIf (Char.isLower |> orUnderscore)
            |. chompWhile (Char.isAlphaNum |> orUnderscore)
            |> getChompedString
        , sorroundedBy '"'
        ]


term : Parser Expr
term =
    oneOf
        [ succeed Identifier
            |= identifier
        , succeed Literal
            |= literal
        , succeed identity
            |. symbol "("
            |. spaces
            |= lazy (\_ -> expression)
            |. spaces
            |. symbol ")"
        ]


expression : Parser Expr
expression =
    term
        |> andThen (expressionHelp [])


expressionHelp : List ( Expr, Operator ) -> Expr -> Parser Expr
expressionHelp revOps expr =
    oneOf
        [ succeed Tuple.pair
            |. spaces
            |= operator
            |. spaces
            |= term
            |> andThen (\( op, newExpr ) -> expressionHelp (( expr, op ) :: revOps) newExpr)
        , lazy (\_ -> succeed (finalize revOps expr))
        ]


finalize : List ( Expr, Operator ) -> Expr -> Expr
finalize revOps finalExpr =
    case revOps of
        [] ->
            finalExpr

        ( expr, Mul ) :: otherRevOps ->
            finalize otherRevOps (Binary expr Mul finalExpr)

        ( expr, Div ) :: otherRevOps ->
            finalize otherRevOps (Binary expr Div finalExpr)

        ( expr, op ) :: otherRevOps ->
            Binary (finalize otherRevOps expr) op finalExpr
