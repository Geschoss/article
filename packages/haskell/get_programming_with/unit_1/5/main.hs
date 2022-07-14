main = do
  print "5"

ifEven f x =
  if even x
    then f x
    else x

genIfXEven x f = ifEven f x

getRequestURL host apiKey resource id =
  host ++ "/"
    ++ resource
    ++ "/"
    ++ id
    ++ "?token="
    ++ apiKey

getHostRequestBuilder host =
  ( \apiKey resource id ->
      getRequestURL host apiKey resource id
  )

exampleUrlBuilder = getHostRequestBuilder "http://example.com"