module Knueppel.AstPlayground exposing (main)

import Browser
import Html exposing (Html, div, h1, h2, span, text, textarea)
import Html.Attributes exposing (rows, style, value)
import Html.Events exposing (onInput)
import Knueppel.Ast exposing (Expr(..), Literal(..), Operator(..))
import Knueppel.Parser exposing (parse)


type alias Model =
    String


type Msg
    = CodeChanged String


update : Msg -> Model -> Model
update msg _ =
    case msg of
        CodeChanged str ->
            str



-- TODO: Remove ugly inline CSS and use Elm UI


view : Model -> Html Msg
view src =
    let
        ast =
            parse src

        astView =
            case ast of
                Ok expr ->
                    exprView expr

                Err _ ->
                    div [] []
    in
    div [ style "font-family" "Menlo, Arial", style "padding" "30px" ]
        [ h1 [] [ text "Knüppel Parser" ]
        , h2 [] [ text "Syntax" ]
        , textarea
            [ rows 10
            , style "width" "calc(100% - 20px)"
            , style "font-size" "14px"
            , style "color" "white"
            , style "background-color" "rgba(0,0,0,0.8)"
            , style "padding" "10px"
            , style "border" "1px solid rgba(0,0,0,0.3)"
            , style "border-radius" "2px"
            , onInput CodeChanged
            , value src
            ]
            []
        , h2 [] [ text "AST" ]
        , div
            [ style "marginTop" "20px"
            , style "border" "1px solid rgba(0,0,0,0.3)"
            , style "border-radius" "2px"
            , style "background" "rgba(0,0,0,0.7)"
            , style "font-size" "14px"
            , style "color" "white"
            ]
            [ astView ]
        , h2 [] [ text "Raw AST" ]
        , text (Debug.toString ast)
        ]


exprView : Expr -> Html msg
exprView e =
    case e of
        Identifier i ->
            div [] [ text "(Identifier ", span [ style "color" "rgb(31, 144, 224)" ] [ text i ], text ")" ]

        Literal l ->
            div []
                [ text "("
                , case l of
                    Number n ->
                        litV "Number " "red" (text <| String.fromFloat n)

                    String_ s ->
                        litV "String " "rgb(49, 255, 15)" (text ("'" ++ s ++ "'"))

                    List_ li ->
                        litV "List ("
                            "white"
                            (span []
                                [ div [ style "margin-left" "20px" ] (List.map exprView li)
                                , text ")"
                                ]
                            )
                , text ")"
                ]

        Binary left op right ->
            div [ style "padding" "10px", style "background" "rgba(0,0,0,0.2)" ]
                [ text " Binary"
                , div [ style "display" "flex", style "flex-direction" "column", style "margin-left" "20px" ]
                    [ row "left" (exprView left)
                    , row "operator"
                        (div [ style "color" "rgb(255, 15, 248)" ]
                            [ text
                                (case op of
                                    Add ->
                                        "+"

                                    Sub ->
                                        "-"

                                    Mul ->
                                        "*"

                                    Div ->
                                        "/"

                                    Lt ->
                                        "<"

                                    Lte ->
                                        "<="

                                    Equals ->
                                        "="

                                    Gt ->
                                        ">"

                                    Gte ->
                                        ">="

                                    Diff ->
                                        "<>"

                                    And ->
                                        "AND"

                                    Or ->
                                        "OR"

                                    In ->
                                        "IN"
                                )
                            ]
                        )
                    , row "right" (exprView right)
                    ]
                ]


row : String -> Html msg -> Html msg
row t v =
    div [ style "display" "flex", style "align-items" "flex-start", style "margin-top" "4px" ]
        [ div
            [ style "width" "90px"
            , style "color" "rgba(255,255,255,0.7)"
            ]
            [ text (t ++ ": ") ]
        , v
        ]


litV : String -> String -> Html msg -> Html msg
litV name color val =
    span []
        [ text name
        , span [ style "color" color ] [ val ]
        ]


initKnueppel : String
initKnueppel =
    """date > '2020-01-01' AND 
(total + "expenses" / 4 <= 300 OR invoiced) AND
state IN ['active', 'disabled', old_state]"""


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initKnueppel
        , view = view
        , update = update
        }
