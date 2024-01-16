const CustomTabBarButton = ({children,onPress}) => (
    <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
    >
      
      <View style={{width:70,height:70,borderRadius:35, }} >
        {children}
      </View>
    </TouchableOpacity>
    
  )